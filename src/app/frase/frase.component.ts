import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-frase',
  templateUrl: './frase.component.html',
  styleUrls: ['./frase.component.css']
})
export class FraseComponent {
  fraseAtual: string = '';
  isLoading: boolean = false;

  constructor(private http: HttpClient) { }

  ngOnInit(): void {
    this.carregarFraseMotivadora();
  }

  carregarFraseMotivadora() {
    this.isLoading = true;
    this.http.get('https://api.quotable.io/random').subscribe((data: any) => {
      const fraseEmIngles = data.content;
      this.traduzirFrase(fraseEmIngles);
    });
  }

  traduzirFrase(frase: string) {
    this.http.get(`https://api.mymemory.translated.net/get?q=${frase}&langpair=en|pt-BR`).subscribe((data: any) => {
      this.fraseAtual = data.responseData.translatedText;
      this.isLoading = false;
    });
  }
}
