import React, { Component } from 'react';
import './App.css';
import { VendingMachineAPI } from './VendingMachineAPI';
import { VendingMachine } from './VendingMachine';

const items = [
    {label: 'Coca-Cola', cost: 60},
    {label: 'Pepsi', cost: 50},
    {label: 'Milk', cost: 100},
    {label: 'iPhone', cost: 100000},
];

class App extends Component {
    constructor() {
        super(...arguments);

        this.onClickAddCentsButton = this.onClickAddCentsButton.bind(this);
        this.onClickItem = this.onClickItem.bind(this);

        this.vendingMachineAPI = new VendingMachineAPI(items, (item, change) => {
            this.syncStateWithVendingMachine();
            alert(`You got the ${item.label}! Your change is $${change / 100}`);
        });

        this.state = {
            cents: 0,
            selectedItemIndex: null,
        };
    }

    /**
     * We could implement something like "vendingMachineAPI.onChange",
     * but let's imagine that we can't, because API is very old and hardcoded into hardware.
     */
    syncStateWithVendingMachine() {
        this.setState({
            cents: this.vendingMachineAPI.cents,
            selectedItemIndex: this.vendingMachineAPI.selectedItemIndex,
        });
    }

    onClickAddCentsButton(cents) {
        try {
            this.vendingMachineAPI.insertCents(cents);
            this.syncStateWithVendingMachine();
        } catch (error) {
            alert(error.message);
        }
    }

    onClickItem(itemIndex) {
        try {
            this.vendingMachineAPI.selectItem(itemIndex);
            this.syncStateWithVendingMachine();
        } catch (error) {
            alert(error.message);
        }
    }

    render() {
        return (
            <div className="App">
                <VendingMachine
                    items={items}
                    cents={this.state.cents}
                    selectedItemIndex={this.state.selectedItemIndex}
                    onClickAddCentsButton={this.onClickAddCentsButton}
                    onClickItem={this.onClickItem}
                />
            </div>
        );
    }
}

export default App;
