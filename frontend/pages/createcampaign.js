import React from 'react'
import CreateCampaign from '../components/create-campaign/CreateCampaign'
import Navbar from '../components/navbar/Navbar'
import MainLayout from '../layouts/MainLayout'

export default function Campaign() {
  return (
    <MainLayout>
        <CreateCampaign />
    </MainLayout>
  )
}
