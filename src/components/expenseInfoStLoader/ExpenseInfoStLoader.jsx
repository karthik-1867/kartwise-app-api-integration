import React from 'react'

export default function ExpenseInfoStLoader() {
  return (
    <div className='expenseGroupDetailContainerLoader'>
        <div className="expenseGroupDetailContainerLoaderDetails">
            <div className='expenseGroupDetailContainerLoaderLogo'/>
            <div className="ExpenseUserAndDetailsLoader">
                <div className="ExpenseUserAndDetailsLoaderTitle"/>
                <div className="ExpenseUserAndDetailsLoaderOwner"/>
                <div className="ExpenseSpendAndPaidLoader">
                    <div className='spentLoader'></div>
                    <div className='recived1Loader'></div>
                </div>
            </div>
        </div>
        <div className="expenseGroupDetailsLoaderButton"/>
    </div>
  )
}
