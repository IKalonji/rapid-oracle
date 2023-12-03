import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card } from 'primereact/card';
import { Button } from 'primereact/button';
import { Divider } from 'primereact/divider';
import { Chip } from 'primereact/chip';
import { InputText } from 'primereact/inputtext';
import Blockies from 'react-blockies'; 
import { market_card } from '../models/market_card_model';
import { Badge } from 'primereact/badge';

import { AppStateService } from '../Appstate-sevice/AppState.service';

const ViewCards = () => {
  const service = new AppStateService();
  service.getItemsFromRecord();
  const navigate = useNavigate();

  const itemsArray = [service.polybaseResponse[0]];

  console.log(itemsArray);

  console.log('from view: ',service.polybaseResponse[0]);

  return (
    <div className="p-grid p-justify-center">
      <div className="bg-bluegray-900 text-gray-100 p-3 flex justify-content-between lg:justify-content-center align-items-center flex-wrap ">
        <div className="font-bold mr-8">🔥 Popular functions !</div>
        <div className="align-items-center hidden lg:flex flex flex-wrap gap-2">

          <Chip label="Popular" />
          <Chip label="popular" />
          <Chip label="popular" />

        </div>
      </div>
      <div style={{ height: '30px' }}></div>
      <div class="pl-7 border-round">
        <div className="pl-12 pt-6 text-3xl font-medium text-900 mb-3">Available functions <Badge  value={market_card.length}/></div>
    </div>

      <div className="flex flex-column">
        <div className="flex align-items-center justify-content-center h-4rem  font-bold border-round m-2">
          <span className="p-input-icon-left">
            <i className="pi pi-search" />
            <InputText placeholder="Search" />
          </span>
        </div>
      </div>

      <div style={{ height: '20px' }}></div>

      <div className="flex justify-content-center flex-wrap gap-6">

      {itemsArray.map((items, index) => (
                  <React.Fragment key={index}>
                  <Card className="w-20rem">
                    <Blockies scale={8} spotColor='#000' color='#dfe' seed={items.title} size={36} />
                    <Divider />
      
                    <span className="block text-2xl font-bold mb-1">{items.title}</span>
                    <Divider />
      
                    <div>{items.author}</div>
                    <div style={{ height: '8px' }}></div>
      
                    <div>{items.short_details}</div>
                    <Divider />
                    <Button
                      style={{ width: '100%' }}
                      label="open"
                      severity="primary"
                      size="medium"
                      onClick={() => {
                        navigate('/view-functions-fully', { state: { ...items } });
                      }}
                    />
                    <div style={{ height: '30px' }}></div>
                  </Card>
                </React.Fragment>
      ))}

       

        {market_card.map((card, index) => (
          <React.Fragment key={index}>
            <Card className="w-20rem">
              <Blockies scale={8} spotColor='#000' color='#dfe' seed={card.title} size={36} />
              <Divider />

              <span className="block text-2xl font-bold mb-1">{card.title}</span>
              <Divider />

              <div>{card.author}</div>
              <div style={{ height: '8px' }}></div>

              <div>{card.short_details}</div>
              <Divider />
              <Button
                style={{ width: '100%' }}
                label="open"
                severity="primary"
                size="medium"
                onClick={() => {
                  navigate('/view-functions-fully', { state: { ...card } });
                }}
              />
              <div style={{ height: '30px' }}></div>
            </Card>
          </React.Fragment>
        ))}
        <Divider />
      </div>
    </div>
  );
};

export default ViewCards;
