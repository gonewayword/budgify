// import React from 'react';
// 
// class CategoryPopup extends React.Component {
// 	render() {
// 		var info = this.props.info;
// 		var categoryInfo = this.props.categoryInfo;
// 		console.log(info);
// 		console.log(categoryInfo);
// 		return(
// 			<div>
// 			{info.categories.map(category => {
// 				<div className="category-popup">
// 					<div className="pop-content">
// 					<div className="addcat-title">Add Expenses to {name}</div>
// 					<div className="row expense-holder colnames">
// 						<div className="column quarter describe">
// 							Description
// 						</div>
// 						<div className="column quarter spend">
// 							Cost
// 						</div>
// 						<div className="column quarter cat">
// 							Category
// 						</div>
// 						<div className="column quarter date">
// 							Date
// 						</div>
// 					</div>
// 						{expenses.map((expense, i) => {
// 							let formattedDate = '';
// 							if(expense.date) {
// 								let datetime = new Date(expense.date);
// 								let day = datetime.getDate();
// 								let month = datetime.getMonth() + 1;
// 								let year = datetime.getFullYear();
// 								formattedDate = month + ' / ' + day + ' / ' + year;
// 							} else {
// 								formattedDate = '';
// 							}
// 							return (
// 								<div className="row expense-holder " key={i}>
// 									<div className="column quarter describe">
// 										{expense.description}
// 									</div>
// 									<div className="column quarter spend">
// 										$ {expense.cost}
// 									</div>
// 									<div className="column quarter cat">
// 										{expense.category || 'None'}
// 									</div>
// 									<div className="column quarter date">
// 										{formattedDate}
// 									</div>
// 									<button className="delete" onClick={this.addToCategory}>
// 										+
// 									</button>
// 								</div>
// 							)
// 						})}
// 					</div>
// 				</div>
// 			})}
// 			</div>
// 		)
// 	}
// }
// 
// export default CategoryPopup;