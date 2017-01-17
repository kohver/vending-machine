import React from 'react';
import './VendingMachine.css';

export const VendingMachine = (props) => (
    <div className="vending-machine">
        <img
            alt="Vending Machine"
            className="vending-machine-img"
            src={require('../images/vending-machine.jpg')}
        />
        <div className="operations">
            <h3>
                Choose an item:
            </h3>
            <div>
                {props.items.map((item, itemIndex) =>
                    <button
                        key={itemIndex}
                        onClick={props.onClickItem.bind(this, itemIndex)}
                    >
                        {item.label} – ${item.cost / 100}
                    </button>
                )}
            </div>

            <h3>
                Insert cents:
            </h3>
            <div>
                {[10, 50, 100, -1].map(cents =>
                    <button
                        key={cents}
                        onClick={props.onClickAddCentsButton.bind(this, cents)}
                    >
                        ${cents / 100}
                    </button>
                )}
            </div>

            <h3>
                {props.selectedItemIndex !== null ?
                    `${props.items[props.selectedItemIndex].label} ($${props.cents / 100}/${props.items[props.selectedItemIndex].cost / 100})`
                : props.cents ?
                    `Choose an item for $${props.cents / 100}`
                :
                    `Choose an item or insert money`
                }
            </h3>
        </div>
    </div>
);

VendingMachine.propTypes = {
    items: React.PropTypes.arrayOf(React.PropTypes.shape({
        label: React.PropTypes.string.isRequired,
        cost: React.PropTypes.number.isRequired
    })).isRequired,
    selectedItemIndex: React.PropTypes.number,
    cents: React.PropTypes.number,
    onClickItem: React.PropTypes.func.isRequired,
    onClickAddCentsButton: React.PropTypes.func.isRequired,
};

VendingMachine.defaultProps = {
    selectedItemIndex: null,
    cents: 0,
};
