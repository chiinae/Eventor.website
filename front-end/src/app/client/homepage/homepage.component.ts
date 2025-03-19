import { Component, OnInit } from '@angular/core';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { HeaderNologinComponent } from './header-nologin/header-nologin.component';
import { AuthService } from '../../services/auth.service';
import { HeaderService } from '../../services/header.service';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-homepage',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    HeaderComponent,
    HeaderNologinComponent,
    FooterComponent,
  ],
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.css']
})
export class HomepageComponent implements OnInit {
  isLoggedIn: boolean = false;
  currentUser: any;

  constructor(
    private authService: AuthService,
    public headerService: HeaderService,
    private userService: UserService
  ) {}

  ngOnInit() {
    // Kiểm tra trạng thái đăng nhập khi component được khởi tạo
    this.isLoggedIn = this.authService.getCurrentLoginStatus();
    
    // Theo dõi thay đổi trạng thái đăng nhập
    this.authService.getLoginStatus().subscribe(
      (loggedIn: boolean) => {
        console.log('Login status changed:', loggedIn);
        this.isLoggedIn = loggedIn;
        
        if (loggedIn) {
          // Nếu đã đăng nhập, lấy thông tin user
          this.userService.getCurrentUser().subscribe(
            (user) => {
              if (user) {
                this.currentUser = user;
                console.log('Current user loaded:', user);
              }
            },
            (error) => {
              console.error('Error loading user:', error);
            }
          );
        } else {
          this.currentUser = null;
        }
      }
    );
  }
}
