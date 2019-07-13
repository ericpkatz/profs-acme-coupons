const Sequelize = require('sequelize');
const conn = new Sequelize( process.env.DATABASE_URL || 'postgres://localhost/acme_coupon_db', { logging: true });

const Coupon = conn.define( 'coupon', {
    id: {
      type: Sequelize.UUID,
      defaultValue: Sequelize.UUIDV4,
      primaryKey: true
    },
    name: {
        type: Sequelize.STRING
    },
    percentOff: {
        type: Sequelize.INTEGER
    }
} )

const Product = conn.define( 'product', {
    id: {
      type: Sequelize.UUID,
      defaultValue: Sequelize.UUIDV4,
      primaryKey: true
    },
    name: {
        type: Sequelize.STRING
    }
} )

Coupon.belongsTo(Product);
Product.hasMany(Coupon);

const syncAndSeed = async () => {
    await conn.sync({force:true});
    const foo = await Product.create({ name: 'foo'});
    const bar = await Product.create({ name: 'bar'});
    const bazz = await Product.create({ name: 'bazz'});
    await Coupon.create({ name: '50% off foo', percentOff: 50, productId: foo.id });
    await Coupon.create({ name: '20% off bar', percentOff: 20, productId: bar.id });
}

syncAndSeed();


const express = require('express');
const app = express();
const port = process.env.PORT || 3000;
const path = require('path');

app.use('/dist', express.static(path.join(__dirname, 'dist')));

app.get('/api/products', async (req, res, next) => {
    try{
        res.send( await Product.findAll( { include: [ ] } ) );
    }
    catch(err){
        next(err);
    }
})

app.get('/api/coupons', async (req, res, next) => {
    try{
        res.send( await Coupon.findAll() );
    }
    catch(err){
        next(err);
    }
})

app.get('/', (req, res, next) => {
    res.sendFile( path.join( __dirname, 'index.html') )
})

app.listen(port, () => console.log(`app listening on port ${port}`))
