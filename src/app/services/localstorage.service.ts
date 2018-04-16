import { Injectable } from '@angular/core';


@Injectable()
export class LocalstorageService {

  constructor() { }

  // Set Authentication Token
  public SetAuthorizationData(auth): void {
    localStorage.setItem('Authorization', auth);
  }

  // Get Authentication Token
  public GetValueFromLocalStorage(): string {
    const tokendata = localStorage.getItem('Authorization');
    return tokendata == null ? null : tokendata;
  }

  // Remove Authentication Token
  public RemoveValueFromLocalStorage(): void {
    localStorage.removeItem('Authorization');
  }

  // Set Profile Pic Id
  public SetProfilePic(auth): void {
    localStorage.setItem('Public_id', auth);
  }

  // Get Profile Pic Id
  public GetProfilePic(): string {
    const ProPicdata = localStorage.getItem('Public_id');
    return ProPicdata == null ? null : ProPicdata;
  }

  // Remove Profile Pic Id
  public RemoveProfilePic(): void {
    localStorage.removeItem('Public_id');
  }
}
