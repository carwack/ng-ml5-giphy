import { Component, OnInit, ViewChild } from '@angular/core';
import ml5 from 'ml5';
import { GiphyService, IGiphy } from './services/giphy.service';

interface IResult {
  label: string;
  confidence: string;
  gif: IGiphy;
}


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'ng-ml5-giphy';
  classifier: { classify: (arg0: any, arg1: (err: any, results: any) => void) => void };
  isModelLoaded = false;
  result: IResult = {
    label: '',
    confidence: '',
    gif: {
      gifUrl: '',
      giphyUrl: '',
      title: ''
    }
  };
  @ViewChild('image') image: any;
  img: string;
  imgName = 'Upload an image to start';
  changingGif = false;

  ngOnInit(): void {
    this.classifier = ml5.imageClassifier('MobileNet', () => this.isModelLoaded = true);
  }

  constructor(
    private giphyService: GiphyService,
  ) {}

  // TODO: specify function name: eg: classifyImage()
  private classify(): void {
    this.classifier.classify(this.image.nativeElement, (err, results) => {
      if (err) {
        console.error(err);
      } else {
        console.log(results);
        this.result.label = results[0].label;
        this.result.confidence = (results[0].confidence * 100).toFixed(2);
        this.giphyService.fetchGiphy(this.result.label).subscribe(res => {
          this.changingGif = false;
          this.result.gif = res;
        });
      }
    });
  }

  uploadImage(event: { target: { files: any[] } }): void {
    this.changingGif = true;
    const image = event.target.files[0];
    const reader = new FileReader();
    this.imgName = image.name;
    reader.readAsDataURL(image);
    reader.onload = (e) => {
      this.img = e.target.result.toString();
      this.classify();
    };
  }
}


/* TODO: change folder structure:
    app:
        services
        components
        interfaces
*/

/*
  TODO: Clean up app.component.ts
    - Add component for upload/ml5 stuff
        ML5 upload
        Gif component
          data doorgeven via input & output
            pseudo:
                <div id="app">
                  <loading-comp></loading-comp>
                     @Output ml5uploadComplete = new EventEmitter();     -> ml5uploadComplete.emit(result)
                  <ml5-upload-comp (ml5uploadComplete)="renderGif(result)"></ml5-upload-comp>
                    @Input() result;    -> ngOnChanges() {} // triggered bij elke input verandering
                  <gif-comp [result]="ml5result"></gif-comp>
                </diV
*/
