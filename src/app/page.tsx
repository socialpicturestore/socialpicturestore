// page.tsx
"use client";

import React from 'react'
import {Tab, Tabs} from "@/shared/ui";


const page = () => {
  return <div>Hello SPAртанцы
      <Tabs
          defaultActiveId="tab1"
          orientation="horizontal"
          onTabChange={(id) => console.log('Активная вкладка:', id)}
      >
          <Tab
              id="tab1"
              label="Первая вкладка"
              className="custom-tab-class"
          >
              <div>Контент первой вкладки</div>
          </Tab>

          <Tab
              id="tab2"
              label="Вторая вкладка"
              icon={<span>✨</span>} // Пример иконки
          >
              <div>Контент второй вкладки</div>
          </Tab>
      </Tabs>

  </div>
}

export default page
