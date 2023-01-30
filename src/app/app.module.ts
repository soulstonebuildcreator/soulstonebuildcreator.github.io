import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { PageHeaderComponent } from './resources/page-header/page-header.component';
import { StartPageComponent } from './modules/start-page/start-page.component';
import { CreateBuildComponent } from './modules/create-build/create-build.component';
import { ViewSkillsComponent } from './modules/view-skills/view-skills.component';
import { SkillContainerComponent } from './modules/shared/skill-container/skill-container/skill-container.component';
import { CharacterContainerComponent } from './modules/shared/character-container/character-container/character-container.component';
import { SelectorBaseComponent } from './modules/shared/selector-base/selector-base/selector-base.component';
import { BuilContainerComponent } from './modules/shared/build-container/build-container/build-container.component';
import { FormsModule } from '@angular/forms';
import { FilterskillsPipe } from './resources/pipes/filterskills.pipe';

@NgModule({
  declarations: [
    AppComponent,
    PageHeaderComponent,
    StartPageComponent,
    CreateBuildComponent,
    ViewSkillsComponent,
    SkillContainerComponent,
    CharacterContainerComponent,
    SelectorBaseComponent,
    BuilContainerComponent,
    FilterskillsPipe
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
