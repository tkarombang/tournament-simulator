import Layout from "@/components/Layout";
import React, { useEffect, useState } from "react";
// import KnockoutStages from "@/components/knockoutTim/KnockoutStages";
import initialData from "@/data";
import dynamic from "next/dynamic";

export default function Knockout() {
  const KnockoutStages = dynamic(() => import("@/components/knockoutTim/KnockoutStages"), {
    ssr: false,
    loading: () => <div className="p-4 text-center text-gray-500 dark:text-gray-400">Loading Knockout Stage...</div>,
  });
  // const getData = localStorage.getItem("knockoutData");
  // console.log(getData);
  return (
    <Layout>
      <div className="container">
        <KnockoutStages />
      </div>
    </Layout>
  );
}
