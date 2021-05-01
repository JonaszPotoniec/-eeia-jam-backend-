import DataTypes from 'sequelize'

const hashInit = (db) => {
    const Hash = db.define('Hash', {
        hash_id: {
            type: DataTypes.UUID,
            allowNull: false,
            primaryKey: true,
            defaultValue: DataTypes.UUIDV4,
            unique: true
        },
        hash: {
            type:DataTypes.STRING(128),
            allowNull:false,
            unique: true
        }
    });

    return Hash;
}

export default hashInit;