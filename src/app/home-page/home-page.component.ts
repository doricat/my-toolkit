import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';

@Component({
    selector: 'app-home-page',
    templateUrl: './home-page.component.html',
    styleUrls: ['./home-page.component.scss']
})
export class HomePageComponent implements OnInit {
    title = 'Home';

    constructor(private titleService: Title) { }

    ngOnInit(): void {
        this.titleService.setTitle(this.title);
    }
}
