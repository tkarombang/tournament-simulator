import Layout from "@/components/Layout";
import React from "react";
import KnockoutStage from "@/components/knockoutTim/KnockoutStages";

export default function Knockout() {
  return (
    <Layout>
      <div className="container">
        <KnockoutStage />
      </div>
    </Layout>
  );
}
