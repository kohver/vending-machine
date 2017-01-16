import React, { Component } from 'react';
import './App.css';

const itemsConfig = [
    {label: 'Coca-Cola', cost: 0.6},
    {label: 'Pepsi', cost: 0.5},
    {label: 'Milk', cost: 1},
    {label: 'iPhone', cost: 1000},
];

// 2.7 + 0.1 = 2.8000000000000003
const safeSum = (a, b) => Number((a + b).toFixed(2));

class App extends Component {
    constructor() {
        super(...arguments);

        this.onClickGet = this.onClickGet.bind(this);
        this.state = {
            money: 0,
            selectedItemIndex: null,
        };
    }

    onClickAddMoneyButton(money) {
        this.setState(prevState => ({
            money: safeSum(prevState.money, money),
        }));
    }

    onClickItem(itemIndex) {
        this.setState({
            selectedItemIndex: itemIndex,
        });
    }

    onClickGet() {
        const selectedItemIndex = this.state.selectedItemIndex;

        this.setState(prevState => ({
            money: safeSum(prevState.money, -itemsConfig[selectedItemIndex].cost),
            selectedItemIndex: null,
        }), () => {
            alert(`You got the ${itemsConfig[selectedItemIndex].label}! Your charge is $${this.state.money}`);
        });
    }

    render() {
        return (
            <div className="App">
                <img
                    alt="Vending Machine"
                    className="vending-machine"
                    src={require('../images/vending-machine.jpg')}
                />
                <div className="operations">
                    <h3>
                        Choose an item:
                    </h3>
                    <div>
                        {itemsConfig.map((item, itemIndex) =>
                            <button
                                key={itemIndex}
                                onClick={this.onClickItem.bind(this, itemIndex)}
                            >
                                {item.label} – ${item.cost}
                            </button>
                        )}
                    </div>

                    <h3>
                        Insert money:
                    </h3>
                    <div>
                        {[0.1, 0.5, 1].map(cash =>
                            <button
                                key={cash}
                                onClick={this.onClickAddMoneyButton.bind(this, cash)}
                            >
                                ${cash}
                            </button>
                        )}
                    </div>

                    {!!(this.state.selectedItemIndex !== null || this.state.money) &&
                        <div>
                            <button
                                onClick={this.onClickGet}
                                className="get-it-button"
                                disabled={
                                    this.state.selectedItemIndex === null ||
                                    this.state.money < itemsConfig[this.state.selectedItemIndex].cost
                                }
                            >
                                {this.state.selectedItemIndex !== null ?
                                    `Get the ${itemsConfig[this.state.selectedItemIndex].label} ($${this.state.money}/${itemsConfig[this.state.selectedItemIndex].cost})`
                                :
                                    `Choose an item for $${this.state.money}`
                                }
                            </button>
                        </div>
                    }
                </div>
            </div>
        );
    }
}

export default App;
