import { Component, OnInit } from '@angular/core'
import ml5 from 'ml5'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'ng-ml5-giphy'
  classifier = {}
  isModelLoaded = false

  ngOnInit() {
    this.classifier = ml5.imageClassifier('MobileNet', this.modelLoaded.bind(this))
  }

  private modelLoaded() {
    console.log('model loaded')
    this.isModelLoaded = true
  }
}
