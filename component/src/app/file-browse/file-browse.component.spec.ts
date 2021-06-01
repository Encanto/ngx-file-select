/**
 *  Copyright (c) Encanto Squared LLC. All rights reserved.
 *  Licensed under the Apache License, Version 2.0 (the "License"); you may not use
 *  this file except in compliance with the License. You may obtain a copy of the
 *  License at http://www.apache.org/licenses/LICENSE-2.0
 *
 *  THIS CODE IS PROVIDED ON AN *AS IS* BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 *  KIND, EITHER EXPRESS OR IMPLIED, INCLUDING WITHOUT LIMITATION ANY IMPLIED
 *  WARRANTIES OR CONDITIONS OF TITLE, FITNESS FOR A PARTICULAR PURPOSE,
 *  MERCHANTABLITY OR NON-INFRINGEMENT.
 *
 *  See the Apache Version 2.0 License for specific language governing permissions
 *  and limitations under the License. 
 */

import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FileBrowseComponent } from './file-browse.component';

describe('FileBrowseComponent', () => {
  let component: FileBrowseComponent;
  let fixture: ComponentFixture<FileBrowseComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule
      ],
      declarations: [ FileBrowseComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FileBrowseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
