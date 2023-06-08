
import React,{ useState, useEffect } from 'react';

import { Helmet } from 'react-helmet-async';
import { Grid, Container } from '@mui/material';
import {
  AppWidgetSummary
  
} from '../../sections/@dashboard/app';

import AppWidgetSummaryOne from '../../sections/@dashboard/app/AppWidgetSummaryOne';
import AppWidgetSummaryThree from '../../sections/@dashboard/app/AppWidgetSummaryThree';
import dashboardService from '../../services/dashboard.service';

// ----------------------------------------------------------------------


export default function Report() { 

  const [partner, setPartner] = useState([])
  const [partnerAll, setPartnerAll] = useState({});
  
  const [store, setStore] = useState([])
  const [storeAll, setStoreAll] = useState({});

  const [endUser, setEndUser] = useState([])
  const [endUserAll, setEndUserAll] = useState({});

  const [campaign, setCampaign] = useState(0)
  const [category, setCategory] = useState(0);
  useEffect(() =>{
    dashboardService.PartnerCount().then(
      response => {
        if(response.data && response.data.success) {
          const temp = response.data.data
          console.log(temp)
          setPartner([{
            name: "Verified",
            value: temp.verified
          }])
          setPartnerAll({
            name: "Partner",
            value: temp.all
          })
        }
      }
    )
    dashboardService.StoreCount().then(
      response => {
        if(response.data && response.data.success) {
          const temp = response.data.data
          console.log(temp)
          setStoreAll({
            name: "Store",
            value: temp.all})
          setStore([{
            name: "NeedApproved",
            value: temp.needApproved
          }, {
            name: "Approved",
            value: temp.approved
          },{
            name: "Rejected",
            value: temp.rejected
          }])
        }
      }
    )
    dashboardService.EndUserCount().then(
      response => {
        if(response.data && response.data.success) {
          const temp = response.data.data
          console.log(temp)
          setEndUser([{
            name: "Verified",
            value: temp.verified
          }])
          setEndUserAll({
            name: "EndUser",
            value: temp.all
          })
          
        }
      }
    )
    dashboardService.CampaignCount().then(
      response => {
        if(response.data && response.data.success) {
          const temp = response.data.data
          console.log(temp)
          setCampaign(temp.all)
        }
      }
    )
    dashboardService.CampaignCountByStatus().then(
      response => {
        if(response.data && response.data.success) {
          const temp = response.data.data
          console.log(temp)
          
        }
      }
    )
    dashboardService.CampaignCountByGame().then(
      response => {
        if(response.data && response.data.success) {
          const temp = response.data.data
          console.log(temp)
          
        }
      }
    )
    dashboardService.ProductCategoryCount().then(
      response => {
        if(response.data && response.data.success) {
          const temp = response.data.data
          console.log(temp)
          setCategory(temp.nCategory)
          
        }
      }
    )
    dashboardService.ProductItemCount().then(
      response => {
        if(response.data && response.data.success) {
          const temp = response.data.data
          console.log(temp)
          
        }
      }
    )
    dashboardService.ItemCountByCategory().then(
      response => {
        if(response.data && response.data.success) {
          const temp = response.data.data
          console.log(temp)
          
        }
      }
    )
    

    
    
  },[])

  return (
    <>
      <Helmet>
        <title> Reports  </title>
      </Helmet>
      <Container maxWidth="xl">

        <Grid container spacing={3}>
        <Grid item xs={12} sm={6} md={4}>
            <AppWidgetSummaryThree title={partnerAll}  isActive={partner}  color="info"/>
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
            <AppWidgetSummaryThree title={endUserAll}  isActive={endUser}  color="info"/>
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
            <AppWidgetSummaryThree title={storeAll}  isActive={store}  color="info"/>
          </Grid>
          

          <Grid item xs={12} sm={6} md={4}>
            <AppWidgetSummary title="Campaign" total={campaign} color="info"  />
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
            <AppWidgetSummary title="ProductCategory" total={category} color="info"  />
          </Grid>

          <Grid item xs={12} sm={6} md={4}>
            <AppWidgetSummary title="Item Orders" total={1723315} color="warning"  />
          </Grid>

          <Grid item xs={12} sm={6} md={4}>
            <AppWidgetSummary title="Bug Reports" total={234} color="error"  />
          </Grid>

        </Grid>
      </Container>
      
      
    </>
  );
}
