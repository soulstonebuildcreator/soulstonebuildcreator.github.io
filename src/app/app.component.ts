import { Component, OnInit } from '@angular/core';
import { IActiveSkill, IStatusEffect } from './resources/models/skill/skill';
import { IRune } from './resources/models/rune/rune';
import { IWeapon } from './resources/models/weapon/weapon';
import { IdbService } from './resources/services/idb/idb.service';
import { forkJoin, map, Observable, of, switchMap, take } from 'rxjs';
import { Version } from '@angular/compiler';
import { Versions, VersionService } from './resources/services/version/version.service';
import { ICharacter } from './resources/models/character/character';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  active_skills: IActiveSkill[] = require('../app/resources/JSONS/active_skills.json');
  runes: IRune[] = require('../app/resources/JSONS/runes.json');
  status_effects: IStatusEffect[] = require('../app/resources/JSONS/status_effects.json');
  weapons: IWeapon[]  = require('../app/resources/JSONS/weapons.json');
  characters: ICharacter[] = require('../app/resources/JSONS/characters.json')
  //versions: Versions[] = this.getVersionsFromLocalStorage();

  formatSkills(){
    this.active_skills.slice(1,this.active_skills.length).forEach((skill,skillIndex)=>{
      if(skill.statusEffect !== undefined){

        skill.statusEffectObj = this.status_effects.filter((item)=>{
          if(skill.statusEffect?.includes(item.effectTitle)){
            return item
          }else{
            return
          }
        })
      }
    })
  }

  formatCharacter(){
    this.characters.slice(1,this.characters.length).forEach((character)=>{
      character.weapons = this.weapons.filter((weapon)=>{
        if(character.characterType === weapon.class){
          return weapon
        }else{
          return
        }
      })
    })
  }

  
  
  constructor(private idbService: IdbService, private versionService: VersionService) {
    if(this.versionService.checkVersion(this.versionService.getVersionNumber('active_skills'),JSON.parse(JSON.stringify(this.active_skills[0])) as Versions)){
      this.formatSkills();
    }
    if(this.versionService.checkVersion(this.versionService.getVersionNumber('characters'),JSON.parse(JSON.stringify(this.characters[0])) as Versions)){
      this.formatCharacter();
    }

  }

  ngOnInit(): void {

    
   this.populateIdbWithJSON(this.active_skills,this.runes,this.status_effects,this.characters,this.weapons).pipe(
    take(1))
    .subscribe((res)=> {
   })

   
  }
  populateIdbWithJSON(active_skills: IActiveSkill[], runes: IRune[], status_effects: IStatusEffect[],characters: ICharacter[], weapons: IWeapon[]):Observable<boolean[]> {
  let boolArr: boolean[] = [];
   const active_skills$ =  
  this.versionService.checkVersion(this.versionService.getVersionNumber('active_skills'),JSON.parse(JSON.stringify(active_skills[0])) as Versions).pipe(
  switchMap((res)=> {
    if(res){
      this.versionService.addVersion(JSON.parse(JSON.stringify(this.active_skills[0])) as Versions)
      active_skills.shift();
      return this.idbService.populateSkills$(active_skills)
    }else{
      return of(false)
    }
  }))
   

   const runes$ = this.versionService.checkVersion(this.versionService.getVersionNumber('runes'),JSON.parse(JSON.stringify(runes[0])) as Versions).pipe(
    switchMap((res)=> {
      if(res){
        this.versionService.addVersion(JSON.parse(JSON.stringify(this.runes[0])) as Versions)
        runes.shift()
       
        return this.idbService.populateRunes$(runes)
      }else{
        return of(false)
      }
    }))

   const status_effects$ = this.versionService.checkVersion(this.versionService.getVersionNumber('status_effects'),JSON.parse(JSON.stringify(status_effects[0])) as Versions).pipe(
    switchMap((res)=> {
      if(res){
        this.versionService.addVersion(JSON.parse(JSON.stringify(this.status_effects[0])) as Versions)
        status_effects.shift()
       
        return this.idbService.populateStatusEffects$(status_effects)
      }else{
        return of(false)
      }
    }))

    const characters$ = this.versionService.checkVersion(this.versionService.getVersionNumber('characters'),JSON.parse(JSON.stringify(characters[0])) as Versions).pipe(
      switchMap((res)=>{
        if(res){
          this.versionService.addVersion(JSON.parse(JSON.stringify(this.characters[0])) as Versions)
          this.characters.shift();
          return this.idbService.populateCharacters$(characters)
        }else{
          return of(false);
        }
      })
    )

   const weapons$ = this.versionService.checkVersion(this.versionService.getVersionNumber('weapons'),JSON.parse(JSON.stringify(weapons[0])) as Versions).pipe(
    switchMap((res)=> {
      if(res){
        this.versionService.addVersion(JSON.parse(JSON.stringify(this.weapons[0])) as Versions)
        weapons.shift()
        
        return this.idbService.populateWeapons$(weapons)
      }else{
        return of(false)
      }
    }))


  return forkJoin([active_skills$,runes$,status_effects$,characters$, weapons$]).pipe(map((addRes: any[])=> {
    addRes.forEach((res)=> {
     boolArr.push(res);
    })
    return boolArr;
   }))
   
  }


 


 
  title = 'soul-stone-build-creator';
}

