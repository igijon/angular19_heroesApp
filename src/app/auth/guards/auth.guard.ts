import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, CanMatch, GuardResult, MaybeAsync, Route, Router, RouterStateSnapshot, UrlSegment } from '@angular/router';
import { Observable, tap } from 'rxjs';
import { AuthService } from '../services/auth.service';

@Injectable({providedIn: 'root'})
export class AuthGuard implements CanMatch, CanActivate {
  constructor(
    private authService: AuthService,
    private router: Router
  ) { }

  private checkAuthStatus(): boolean | Observable<boolean> {
    return this.authService.checkAuthentication()
    .pipe(
      tap( isAuthenticated => console.log('Authenticated', isAuthenticated)),
      tap( isAuthenticated => {
        if(!isAuthenticated) this.router.navigate(['./auth/login']);
      }),
      )
  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | Observable<boolean> {
    // console.log({route, state });
    // console.log('Can Activate');
    // return true;
    return this.checkAuthStatus();
  }
  canMatch(route: Route, segments: UrlSegment[]): boolean | Observable<boolean> {
    // console.log('Can Match');
    // console.log({ route, segments });
    // return true;
    return this.checkAuthStatus();
  }

}

