import React from 'react'

export default function About() {
  return (
    <div className="about-page">
        <h1>Welcome to Everybody's Trash</h1>
        <section className='mission-statement'>
            <h4>Everybody's trash is a community app focused on reducing the amount of salvagable goods that end up in a landfill each year. Use our map  to find the best trash near you and go pick it up! If you see something on the street and its not your style, or it's too big for you to carry, mark it on the map so someone else can grab it! EVERYBODYS TRASH IS UP FOR GRABS - DOWN WITH WASTE</h4>
        </section>
        <section className='about-right'>
            <h2 className="about-header">Everybody's Furniture</h2>
            <article>
                In 2018, the EPA estimates, 9.68 million tons of furniture were sent to landill in the USA. In that same year, the average american household spent 518 dollars on furniture and bedding. Go grab your buddy's truck! <span className="about-call-to-action">Everybody's Trash is your sunroom's new groovy loveseat!</span>
            </article>
        </section>
        <section className='about-left'>
            <h2 className="about-header">Everybody's Electronics</h2>
            <article>
                300 million computers and 1 billion cellphones are globally produced each year. 40 million tons of electronic waste is created every year - these are often landfilled and incinerated releasing toxic chemicals and directly harming the underpaid e-waste workers handling them. Take it off their hands on off your street.  <span className="about-call-to-action">Everyboby's Trash is your retro 80's gaming garage!</span>
            </article>
        </section>
        
    </div>
  )
}
