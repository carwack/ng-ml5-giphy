import { Component, OnInit, ViewChild } from '@angular/core'
import ml5 from 'ml5'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'ng-ml5-giphy'
  classifier: { classify: (arg0: any, arg1: (err: any, results: any) => void) => void }
  isModelLoaded = false
  result = {
    label: '',
    confidence: ''
  }
  @ViewChild('image') image: any
  img: string
  imgName = 'Upload an image to start'

  ngOnInit() {
    this.classifier = ml5.imageClassifier('MobileNet', this.modelLoaded.bind(this))
  }

  private modelLoaded() {
    console.log('model loaded')
    this.isModelLoaded = true
  }

  private classify() {
    console.log(this.image)
    this.classifier.classify(this.image.nativeElement, (err, results) => {
      if (err) {
        console.error(err)
      } else {
        console.log(results)
        this.result.label = results[0].label
        this.result.confidence = (results[0].confidence * 100).toFixed(2)
      }
    })
  }

  private uploadImage(event: { target: { files: any[] } }) {
    const image = event.target.files[0]
    const reader = new FileReader()
    this.imgName = image.name
    reader.readAsDataURL(image)
    reader.onload = (e) => {
      this.img = e.target.result.toString()
      this.classify()
    }
  }
}
