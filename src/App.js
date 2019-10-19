import React from 'react';
import logo from './logo.svg';
import './App.css';

const basketStates=['All',"Pending","Purchased"]
class App extends React.Component {
  constructor(props){
    super(props);
    this.state={"basket":{},filteredList:[],"groceries":[{"id":1,"name":"Strawberry"},{"id":2,"name":"Blueberry"},{"id":3,"name":"Orange"},{"id":4,"name":"Banana"},{"id":5,"name":"Apple"},{"id":6,"name":"Carrot"},{"id":7,"name":"Celery"},{"id":8,"name":"Mushroom"},{"id":9,"name":"Green Pepper"},{"id":10,"name":"Eggs"},{"id":11,"name":"Cheese"},{"id":12,"name":"Butter"},{"id":13,"name":"Chicken"},{"id":14,"name":"Beef"},{"id":15,"name":"Pork"},{"id":16,"name":"Fish"},{"id":17,"name":"Rice"},{"id":18,"name":"Pasta"},{"id":19,"name":"Bread"}],"section":basketStates[0],searchTerm:''};
  }
componentDidMount(){
  this.applyFilter()
}
  addItem=(itemObj)=>{
    if(this.state.basket[itemObj.id])
    this.setState((state)=>({basket:{...state.basket,[itemObj.id]:Object.assign(this.state.basket[itemObj.id],{quantity:this.state.basket[itemObj.id].quantity+1})}}))
    else
    this.setState((state)=>({basket:{...state.basket,[itemObj.id]:Object.assign(itemObj,{quantity:1,isPurchased:false})}}))
  }

  removeItem=(id)=>{
    let basket={...this.state.basket}
    if(basket[id].quantity===1)
    {
      delete basket[id];
    }
    else
    {
      basket[id].quantity-=1;
    }

    this.setState({basket})
  }

applyFilter=()=>{
  this.setState((state)=>({filteredList:state.groceries.filter(({name})=>name.includes(state.searchTerm))}))
}


  purchase=(id)=>{
    let basket={...this.state.basket}
    basket[id].isPurchased=!basket[id].isPurchased;
    console.log('purchased',basket)
    this.setState({basket})
  };

  render(){
  return (
    <div className="App">
    <div className="main">
        <div className="header"><i className="basket fa fa-shopping-basket fa-6" aria-hidden="true" style={{fontSize: "8em"}}></i>
            <h2 className="helloBasket">Hello, Basket!</h2></div>
        <div className="cart">
            <div className="search pa4">
                <input className="inp shadow-5 f4 w-60" placeholder="filter for e.g. Apple" type="text" onChange={event=>{this.setState({searchTerm:event.target.value},()=>this.applyFilter())}}/>
            </div>
            <div className="glist">
                <h3><i className="fa fa-leaf" aria-hidden="true"></i> Groceries</h3>
                <br/>
                <br/>
                <div className="gListItems">
                    {(this.state.searchTerm?this.state.filteredList:this.state.filteredList).map((itemObj,i)=>(
                    <div onClick={()=>this.addItem({...itemObj})} key={itemObj.id} className="groceryItem shadow-1" style={{background: i%2?"rgb(239, 239, 239)":"rgb(255, 255, 255)"}}>
                        <div className="gbutton grow"> + </div>
                        <div className="gtext"> {itemObj.name} </div>
                    </div>))}
                </div>
            </div>
            <div className="blist">
                <div className="heading">
                    <h3> <i className="fa fa-shopping-basket" aria-hidden="true"></i> Basket</h3><i className="red dim grow empty fa fa-trash" aria-hidden="true"></i></div>
                <br/>
                <br/>
                <div className="bListItems">
                    {Object.values(this.state.basket).map((itemObj,i)=>((this.state.section===basketStates[0]||(this.state.section===basketStates[2]&&itemObj.isPurchased)||(this.state.section===basketStates[2]&&itemObj.isPurchased)||(this.state.section===basketStates[1]&&!itemObj.isPurchased))&&(
                    <div key={itemObj.id} className="groceryItem shadow-1" style={{background: (i%2)? "rgb(239, 239, 239)": "rgb(255, 255, 255)",textDecorationLine:(itemObj.isPurchased) ? 'line-through': 'none'}}>
                        <div onClick={()=>{this.removeItem(itemObj.id)}} className="bbutton grow"> - </div>
                        <div className="count"> {itemObj.quantity} </div>
                        <div onClick={()=>this.purchase(itemObj.id)} className="btext f4"> {itemObj.name} </div>
                    </div>)))}

                </div>
            </div>
        </div>
        <div className="footer">
        {basketStates.map((basketState)=>(
          <p style={{textDecoration: this.state.section===basketState?"none":"underline"}} onClick={()=>this.setState({section:basketState})}>{basketState},</p>
        ))}
        </div>
    </div>
</div>);
}
}
export default App;
