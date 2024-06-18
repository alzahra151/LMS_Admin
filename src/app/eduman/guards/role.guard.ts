import { Inject, Injectable, inject } from '@angular/core';
import { CanActivateFn } from '@angular/router';
import { RoleService } from '../services/role/role.service';
import { Router } from '@angular/router';
// import { PermissionService } from '../services/permission/role.service';

export const roleGuard: CanActivateFn = (route, state) => {
  const requiredRole = route.data.requiredRole as string;
  console.log(requiredRole)
  const roleService = inject(RoleService)
  const router = inject(Router)
  return roleService.hasRole(requiredRole)
    .then(hasRole => {
      if (hasRole) {
        return true;
      } else {
        router.navigate(['admin/unauthorized']);
        return false;
      }
    })
    .catch(error => {
      console.error('Error checking role:', error);
      router.navigate(['admin/unauthorized']);
      return false;
    });
};
