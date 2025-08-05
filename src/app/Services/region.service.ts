import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map, of, shareReplay } from 'rxjs';
import { RegionQueryParams } from './Dto/RegionQueryParams';
import { environment } from 'src/environments/environment';

export interface RegionData {
  region: string;
  originalCoords: number[];
  id: string;
  color: string | null;
  cities?: string[];
}

@Injectable({
  providedIn: 'root'
})
export class RegionService {
  private regions$: Observable<RegionData[]>= of([]);
  private regionsById$: Observable<Record<string, RegionData>>= of({});
  private apiUrl = environment.apiUrl; // Use environment variable

  constructor(private http: HttpClient) {
    this.initializeData();
  }
submitRegionForm(regionData: any, queryParams: RegionQueryParams): Observable<any> {
    // Combine form data with query params
    const submissionData = {
      ...regionData,
      ...queryParams
    };
    
    return this.http.post(`${this.apiUrl}/RegionSubmissions`, submissionData);
  }
  private initializeData(): void {
    this.regions$ = this.http.get<RegionData[]>('assets/files/regions.json').pipe(
      shareReplay(1) // Cache the response
    );

    this.regionsById$ = this.regions$.pipe(
      map(regions => {
        const dictionary: Record<string, RegionData> = {};
        regions.forEach(region => {
          dictionary[region.id] = region;
        });
        return dictionary;
      }),
      shareReplay(1)
    );
  }

  // Get all regions as observable
  getRegions(): Observable<RegionData[]> {
    return this.regions$;
  }

  // Get a specific region by ID
  getRegionById(id: string): Observable<RegionData | undefined> {
    return this.regionsById$.pipe(
      map(dict => dict[id])
    );
  }

  // Get all regions as dictionary (id -> region)
  getRegionsDictionary(): Observable<Record<string, RegionData>> {
    return this.regionsById$;
  }

  // Get all region IDs
  getRegionIds(): Observable<string[]> {
    return this.regions$.pipe(
      map(regions => regions.map(r => r.id)))
  }

  // Get region properties as an object
  getRegionProperties(): Observable<{
    regions: RegionData[];
    regionsById: Record<string, RegionData>;
    regionIds: string[];
  }> {
    return this.regions$.pipe(
      map(regions => {
        const regionsById: Record<string, RegionData> = {};
        const regionIds = regions.map(r => r.id);
        
        regions.forEach(region => {
          regionsById[region.id] = region;
        });

        return {
          regions,
          regionsById,
          regionIds
        };
      })
    );
  }
}