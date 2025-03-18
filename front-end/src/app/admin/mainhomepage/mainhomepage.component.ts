import { Component } from '@angular/core';
import { MainheaderComponent } from "../mainheader/mainheader.component";
import { SidebarComponent } from "../sidebar/sidebar.component";
import { RouterModule } from "@angular/router";

@Component({
  selector: 'app-mainhomepage',
  imports: [MainheaderComponent, SidebarComponent, RouterModule],
  templateUrl: './mainhomepage.component.html',
  styleUrl: './mainhomepage.component.css'
})
export class MainhomepageComponent {

}
