//import { sp } from "@pnp/sp/presets/core";
import { WebPartContext } from "@microsoft/sp-webpart-base";
import { sp } from '@pnp/sp/presets/all';

export class SPService {
    constructor(private context: WebPartContext) {
        sp.setup({
            spfxContext: this.context
        });
    }

    public async getListItems(listName: string) {
        try {
            let listItems: any[] = await sp.web.lists.getByTitle(listName)
                .items
                .select("Title,RedirectURL,ImageURL,ImageLink")
                //.select("Title,Description,Image,ImageLink")
                .expand().get();
            return listItems;
        } catch (err) {
            Promise.reject(err);
        }
    }
}



// export async function getBannerConfiguration() {
//     return sp.web.lists
//       .getByTitle("BannerConfiguration")
//       .items
//       .get();
//   }