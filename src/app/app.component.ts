import { Component, OnInit } from '@angular/core';
import ml5 from 'ml5';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'ng-ml5-giphy';
  classifier = {};
  ngOnInit(): void {
    this.classifier = ml5.imageClassifier('MobileNet', this.modelLoaded)
  }

  modelLoaded(): void {
    console.log('model loaded')
  }
}
