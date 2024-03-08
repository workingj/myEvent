import React, { useState, useEffect } from 'react';
   import axios from 'axios';

   const GiftCardTemplates = () => {
     const [templates, setTemplates] = useState([]);

     useEffect(() => {
       const fetchTemplates = async () => {
         try {
           const response = await axios.get('https://api.giphy.com/v1/gifs/search?api_key=dc6zaTOxFJm', {
             params: {
               q: 'gift card',
               limit: 10,
             },
           });
           setTemplates(response.data.data);
         } catch (error) {
           console.error('Error fetching gift card templates:', error);
         }
       };

       fetchTemplates();
     }, []);

     return (
       <div>
         <h2>Gift Card Templates</h2>
         <div className="template-list">
           {templates.map((template) => (
             <img key={template.id} src={template.images.fixed_height.url} alt={template.title} />
           ))}
         </div>
       </div>
     );
   };

   export default GiftCardTemplates;