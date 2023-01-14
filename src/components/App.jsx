import { nanoid } from 'nanoid'

import  ContactForm  from "./ContactForm/ContactForm"
import  {ContactList}   from "./ContactList/ContactList"
import  {Filter}  from "./Filter/Filter"


import Box from "./Box/Box"
import { useState, useEffect, useMemo } from "react"



const  App = () => {
  const [contacts, setContacts] = useState(() => {
    return JSON.parse(window.localStorage.getItem('contacts')) ?? []
  })
  const [filter, setFilter] = useState('')
  
  const addNameForm = (data) => {
    console.log(data);
        const filterByName = contacts.some(el => el.name === data.name)
        if(filterByName){
              alert(`${data.name} is already in contacts`);
            }
    
        else{
          const itemName = {
            id: nanoid(),
            ...data,
            
          }
          
          setContacts(prevState => [itemName, ...prevState])
        }
    }
  
    const handleFilter = (e) => {
      setFilter(e.target.value)
}
    
    const handleSearchInput = useMemo(() => {
      return contacts.filter((contact) => 
      contact.name.toLowerCase().includes(filter.toLowerCase()))
    }, [contacts, filter])

    
    const handleDeleteContact = (contactId) => {
  console.log(contactId);
  setContacts(prevState => prevState.filter((item) => item.id !== contactId))
}

useEffect(() => {
  window.localStorage.setItem('contacts', JSON.stringify(contacts))
}, [contacts])
    

    

    return (
      <>
      <Box as="section" display="flex" justifyContent="center" flexDirection="column" alignItems="center" border='2px solid black' width="50%" borderRadius="10px" p={16} backgroundColor='#609'>
      <h1>Name</h1>
      <ContactForm  onSubmit={addNameForm} />
      <h2>Contacts</h2>
      <Filter filterValue={filter} onChange={handleFilter}/>
      <ContactList itemName={handleSearchInput} onClickDelete={handleDeleteContact}/>
      </Box>
      </>
    )
};

export default App;


// const LS = 'item_contact';

// export class App extends Component {
  
//   state = {
//     contacts: [],
//     filter: '',
//   }
  
//   addNameForm = (data) => {
    
//     const filterByName = this.state.contacts.some(el => el.name === data.name)
//     if(filterByName){
//           alert(`${data.name} is already in contacts`);
//         }

//     else{
//       const itemName = {
//         id: nanoid(),
//         ...data,
        
//       }
//       this.setState(prevState => ({
//         contacts: [itemName, ...prevState.contacts],
        
//       }))
//     }

// }
    
// handleFilter = (e) => {
//   this.setState({filter: e.target.value})
// }

// handleSearchInput = () => {
// const {contacts, filter} = this.state;

// return contacts.filter((contact) => 
// contact.name.toLowerCase().includes(filter.toLowerCase()))
// }

// handleDeleteContact = (contactId) => {
//   console.log(contactId);
//   this.setState((prevState) => ({
//     contacts: prevState.contacts.filter((item) => item.id !== contactId)
//   }))
//   return;
// }

// componentDidMount(){
//   const savedState = JSON.parse(localStorage.getItem(LS))
//   if(savedState){
//     this.setState({contacts: savedState})
//   }
// }

// componentDidUpdate(_, prevState){
//   if(prevState.contacts.length !== 0 || prevState.contacts.length !== this.state.contacts.length){
//     localStorage.setItem(LS, JSON.stringify(this.state.contacts))
// }
// }

//     render(){
//     const {filter} = this.state;
    
//     const visibleContact = this.handleSearchInput()
    
//     return (
//       <>
//       <Box as="section" display="flex" justifyContent="center" flexDirection="column" alignItems="center" border='2px solid black' width="50%" borderRadius="10px" p={16} backgroundColor='#609'>
//       <h1>Name</h1>
//       <ContactForm  onSubmit={this.addNameForm} />
//       <h2>Contacts</h2>
//       <Filter filterValue={filter} onChange={this.handleFilter}/>
//       <ContactList itemName={visibleContact} onClickDelete={this.handleDeleteContact}/>
//       </Box>
//       </>
//     )
//   }
// };

