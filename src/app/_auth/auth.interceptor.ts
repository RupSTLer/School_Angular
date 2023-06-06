import { HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { catchError, Observable, throwError } from "rxjs";
import { UserAuthService } from "../_services/user-auth.service";
import { NotificationService } from "../_services/notification.service";

@Injectable()
export class AuthInterceptor implements HttpInterceptor
{
    // interceptor is responsible for adding the header whenever we make any request to the backend, it will automatically fetch jwt token from local storage and add automatically into header

    constructor(
        private userAuthService: UserAuthService, 
        private router: Router,
        ) { }

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>>
    {
        if(req.headers.get('No-Auth') === 'True')
        {
            return next.handle(req.clone());
        }

        const token = this.userAuthService.getToken();

        // req = this.addToken(req, token);

        if(token)
        {
            req = this.addToken(req, token);
        }

        return next.handle(req).pipe(
            catchError(
                (err: HttpErrorResponse) => {
                    console.log(err.status);
                    if(err.status === 401)
                    {
                        this.router.navigate(['/login']);
                    }
                    else if(err.status === 403)
                    {
                        this.router.navigate(['/forbidden']);
                    }
                    return throwError("something is wrong");
                }
            )
        );
    }

    //will add token into the header
    private addToken(request: HttpRequest<any>, token: string)
    {
        return request.clone(
            {
                setHeaders: {
                    Authorization: `Bearer ${token}`
                }
            }
        );
    }
}