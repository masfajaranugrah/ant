import React from "react";
import {Accordion, AccordionItem} from "@nextui-org/react";
import {MonitorMobileIcon} from "./Icons/MonitorMobileIcon";
import {ShieldSecurityIcon} from "./Icons/ShieldSecurityIcon"
import {InfoIcon} from "./Icons/InfoIcon";
import {InvalidCardIcon} from "./Icons/InvalidCardIcon";

export default function HelpDesk() {
  const itemClasses = {
    base: "py-0 w-full",
    title: "font-normal text-medium",
    trigger: "px-2 py-0 data-[hover=true]:bg-default-100 rounded-lg h-14 flex items-center",
    indicator: "text-medium",
    content: "text-small px-2",
  };

  const defaultContent =
  "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.";


  return (
    <Accordion
      showDivider={false}
      className="p-2 flex flex-col gap-1 w-full max-w-[800px]"
      variant="shadow"
      itemClasses={itemClasses}
    >
      <AccordionItem
        key="1"
        aria-label="Connected devices"
        startContent={<MonitorMobileIcon className="text-primary" />}
        subtitle={
          <p className="flex">
            2 issues to <span className="text-primary ml-1">fix now</span>
          </p>
        }
        title="Connected devices"
      >
        {defaultContent}
      </AccordionItem>
      <AccordionItem
        key="2"
        aria-label="Apps Permissions"
        startContent={<ShieldSecurityIcon />}
        subtitle="3 apps have read permissions"
        title="Apps Permissions"
      >
        {defaultContent}
      </AccordionItem>
      <AccordionItem
        key="3"
        aria-label="Pending tasks"
        classNames={{ subtitle: "text-warning" }}
        startContent={<InfoIcon className="text-warning" />}
        subtitle="Complete your profile"
        title="Pending tasks"
      >
        {defaultContent}
      </AccordionItem>
      <AccordionItem
        key="4"
        aria-label="Card expired"
        classNames={{ subtitle: "text-danger" }}
        startContent={<InvalidCardIcon className="text-danger" />}
        subtitle="Please, update now"
        title={
          <p className="flex gap-1 items-center">
            Card expired
            <span className="text-default-400 text-small">*4812</span>
          </p>
        }
      >
        {defaultContent}
      </AccordionItem>
    </Accordion>
  );
}
