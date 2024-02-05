import { Injectable } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

    constructor(private auth: AuthService) { }

    intercept(req: HttpRequest<any>, next: HttpHandler) {
        const authToken = this.auth.getAuthorizationToken();

        const authReq = req.clone({
            headers: req.headers.set('X-Api-Key', authToken)
        });

        return next.handle(authReq);
    }
}