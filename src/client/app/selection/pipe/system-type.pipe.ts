import { Pipe, PipeTransform } from '@angular/core';
import { CNCSystem, SystemTypeFilter } from '../model/index';

@Pipe({
    name: 'systemTypePipe',
    pure: false
})

export class SystemTypePipe implements PipeTransform {
    transform(CNCSystems: CNCSystem[], filter: SystemTypeFilter): any {
        if(!CNCSystems){
            return CNCSystems;
        }

        if(filter.Manufacturer==='全部'){
            return CNCSystems.filter(function(item){
                if(item.SupportMachineType.indexOf(filter.SupportTypeOfMachine)!==-1
                    && item.SupportChannels>=filter.SupportNumberOfChannels
                    && item.MaxNumberOfFeedShafts>=filter.MaxControlNumberOfFeedAxis){
                        return true;
                }
                else{
                    return false;
                }
            });
        }
        else{
            return CNCSystems.filter(function(item){
                if(item.Manufacturer===filter.Manufacturer
                    && item.SupportMachineType.indexOf(filter.SupportTypeOfMachine)!==-1
                    && item.SupportChannels>=filter.SupportNumberOfChannels
                    && item.MaxNumberOfFeedShafts>=filter.MaxControlNumberOfFeedAxis){
                        return true;
                }
                else{
                    return false;
                }
            });
        }
    }
}