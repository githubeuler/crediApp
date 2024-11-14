import { inject, Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, switchMap } from 'rxjs/operators';
import { Router } from '@angular/router';
import { GeneralService } from '../services/general.service';
import { InterfaceService } from '../services/interface.service';

@Injectable()
export class CierreInterceptor implements HttpInterceptor {
    private generalService = inject(GeneralService)
    private interfaceService = inject(InterfaceService)
    private router = inject(Router)

    user: any
    private readonly excludeUrl = 'general/cierre'
     private readonly excludeUrl2 = 'account/auth'

    constructor() {
       
     }

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        console.log('inter')
        const userData = localStorage.getItem('user');
        console.log('userData',userData)
        if (userData) {
            this.user = JSON.parse(userData);
        }
        if (req.url.includes(this.excludeUrl)) {
            return next.handle(req); // Dejar pasar esta petición sin validación
          }
          
        if (req.url.includes(this.excludeUrl2)) {
            return next.handle(req); // Dejar pasar esta petición sin validación
          }

      
        
        return this.generalService.getCierre(this.user.idRuta, '').pipe(
            switchMap(data => {
                console.log(data)
                if (data.succeeded == true) {
                    if (data.data.tieneCierre == true) {
                       // Limpiar el localStorage
                        localStorage.removeItem('user');

                        // Redirigir al login y limpiar el historial de navegación
                        this.router.navigate(['/login'], { replaceUrl: true });
                        this.interfaceService.toastr('error', 'Esta ruta ya cerro caja', 'Mensaje')
                        //return next.handle(req.clone({ setHeaders: { 'X-Cierre-Caja': 'true' }}));
                         return throwError('Cierre de caja realizado. Redirigiendo al login.');
                    } else {
                        return next.handle(req);
                    }
                    // Si el cierre ya se realizó, redirigir al login
                } else {
                    // Si no se ha hecho el cierre, continuar la petición
                    return next.handle(req);
                }
            }),
            catchError((error: HttpErrorResponse) => {
                return throwError(error);
            })
        );
    }
}