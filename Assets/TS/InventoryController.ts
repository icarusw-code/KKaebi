import { Transform } from 'UnityEngine';
import { ZepetoScriptBehaviour } from 'ZEPETO.Script'
import Slot from './Slot'

export default class InventoryController extends ZepetoScriptBehaviour {

    public slots : Slot[];
    public slotHolder : Transform;

    Start() {    
        this.slots = this.slotHolder.GetComponentsInChildren<Slot>();
    }

}