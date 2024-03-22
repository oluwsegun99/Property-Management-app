import { Args, Query, Resolver } from '@nestjs/graphql';
import { LocationService } from './location.service';

@Resolver()
export class LocationResolver {
    constructor(private locationService: LocationService) { }

    @Query("getStates")
    async getStates() {
        return await this.locationService.getStates();
    };

    @Query("getCities")
    async getCities() {
        return await this.locationService.getCities();
    };

    @Query("getCitiesByStateId")
    async getCitiesByStateId(@Args("stateId") stateId: string) {
        return await this.locationService.getCitiesByStateId(stateId);
    };
}
