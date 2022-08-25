import Head from 'next/head'
import Image from 'next/image'
import Navbar from '../components/navbar/Navbar'
import MainLayout from '../layouts/MainLayout'

export default function Home() {
  return (
    <MainLayout metaTitle="Home" metaDescription="All Campaigns where you can see another person's campaigns, fund campaigns in decentralized manner. Truly Decentralized.">
       Hello
    </MainLayout>
  )
}
