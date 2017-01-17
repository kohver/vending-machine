/**
 * Very simple vending machine API.
 * Imagine that people who have created it did
 * not think about same UI representation.
 */
export class VendingMachineAPI {
    /**
     * @param {Object[]} items – items on sale.
     * @param {Function} onItemFall – callback, that called when machined drop an item.
     */
    constructor(items, onItemFall) {
        // props
        this.items = items;
        this.onItemFall = onItemFall;

        // state
        this.cents = 0;
        this.selectedItemIndex = null;
    }

    /**
     * @param {number} index
     */
    selectItem(index) {
        if (!this.items[index]) {
            throw new Error(`No item with #${index} index`);
        }

        this.selectedItemIndex = index;

        this.fireCallbackIfNeeded();
    }

    /**
     * @param {number} cents
     */
    insertCents(cents) {
        if (cents <= 0) {
            throw new Error(`"cents" must be a positive number. Got ${cents}`);
        }

        this.cents += cents;

        this.fireCallbackIfNeeded();
    }

    /**
     * @private
     */
    fireCallbackIfNeeded() {
        const selectedItem = this.items[this.selectedItemIndex];
        if (!selectedItem) {
            return;
        }

        if (this.cents < selectedItem.cost) {
            return;
        }

        this.cents -= selectedItem.cost;
        this.selectedItemIndex = null;

        this.onItemFall(selectedItem, this.cents);
    }
}
