import {Injectable} from '@angular/core'; 
import { Meta, Title } from '@angular/platform-browser';
import { Config } from '../config/app.config';
import { SEOData } from '../vo/seo';

@Injectable({
    providedIn: 'root'
})
export class SEOService {
  private URL = Config.DOMINIO;
  private SITE_NAME = Config.SITE_NAME;

  constructor(private title: Title, private meta: Meta) { }

  updateBasicMetaTags(data: SEOData) {
    this.title.setTitle(data.title);
    this.meta.updateTag({ name: 'description', content: data.description });

    this.meta.updateTag({ name: 'name', content: data.title });
    this.meta.updateTag({ name: 'image', content: data.image });
    this.meta.updateTag({ name: 'url', content: data.url });
  }

  updateFacebookMetaTags(data: SEOData) {
    this.meta.updateTag({ property: 'og:type', content: 'website' });
    this.meta.updateTag({ property: 'og:title', content: data.title });
    this.meta.updateTag({ property: 'og:description', content: data.description });
    this.meta.updateTag({ property: 'og:image', content: data.image });
    this.meta.updateTag({ property: 'og:url', content: data.url });
    this.meta.updateTag({ property: 'og:site_name', content: this.SITE_NAME });
    this.meta.updateTag({ property: 'og:locale', content: data.locale });
  }

  updateTwitterMetaTags(data: SEOData) {
    this.meta.updateTag({ property: 'twitter:card', content: 'summary_large_image' });
    this.meta.updateTag({ property: 'twitter:title', content: data.title });
    this.meta.updateTag({ property: 'twitter:description', content: data.description });
    this.meta.updateTag({ property: 'twitter:image', content: data.image });
    this.meta.updateTag({ property: 'twitter:url', content: data.url });
    this.meta.updateTag({ property: 'twitter:site', content: '@kite_lx' });
    this.meta.updateTag({ property: 'twitter:domain', content: this.URL });
  }

  updateMetaTags(data: SEOData) {
    const title = data.title || "KiteLX - Plataforma digital de compra/venda de kite";
    const description = data.description || 'Plataforma digital de compra/venda de equipamento de kitesurf, kite, prancha, trapézio, barra, com todas as marcas, veja na seção de Destaques aqui.';
    const image = data.image || `${this.URL}/assets/images/kite-lx-banner-seo.jpg`;
    const url = data.url || this.URL;
    const locale = data.locale || "pt_BR";

    const dataWithDefaults: SEOData = {
      title,
      description,
      image,
      url,
      locale,
      ...data
    }

    this.updateBasicMetaTags(dataWithDefaults);
    this.updateFacebookMetaTags(dataWithDefaults);
    this.updateTwitterMetaTags(dataWithDefaults);
  }
}