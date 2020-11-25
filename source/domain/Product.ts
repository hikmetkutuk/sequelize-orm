import {Model, Sequelize, DataTypes} from "sequelize";

const sequelize = new Sequelize();

interface IProduct extends Model {

    id: number;
    name: string;
}

const Product = sequelize.define<IProduct>("Product", {
    name: {
        type: DataTypes.STRING
    },
    category: {
        type: DataTypes.STRING
    },
    description: {
        type: DataTypes.STRING
    },
    price: {
        type: DataTypes.STRING
    }
});

module.exports = Product;
