import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-admin-profile',
  templateUrl: './admin-profile.component.html',
  styleUrls: ['./admin-profile.component.css']
})
export class AdminProfileComponent implements OnInit{

  constructor() { }

  username: string;
  name: string;
  id: number;
  email: string;

  ngOnInit(): void {
    this.username = "Admin";
    this.name = "Rupam Chakraborty";
    this.id = 3456;
    this.email = "admin12@gmail.com"

  }

}
