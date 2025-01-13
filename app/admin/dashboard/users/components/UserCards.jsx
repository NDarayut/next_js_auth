"use client";

import { Card, CardHeader, CardBody } from "@nextui-org/react";

export default function UserCards({ firstName, lastName, email, createdAt }) {

  return (
    <div className="flex flex-col space-y-6">
      <Card
        className="w-full max-w-lg rounded-lg bg-white border border-gray-200 shadow-lg transform hover:shadow-xl hover:scale-[1.02] transition-transform duration-300 ease-in-out"
      >
        <CardHeader className="flex items-center bg-customGreen rounded-t-lg p-4">
          <div className="flex flex-col space-y-2">
            <h2 className="text-lg font-semibold text-white">
              {firstName} {lastName}
            </h2>
            <p className="text-sm text-white">{email}</p>
          </div>
        </CardHeader>
        <CardBody className="p-4">
          <div className="text-sm text-gray-600">
            <p>
              <strong>Registered:</strong> {new Date(createdAt).toLocaleString()}
            </p>
          </div>
        </CardBody>
      </Card>
    </div>
  );
}
