import React from 'react'
import { ArrowLeft, AlertCircleIcon } from "lucide-react"
import { Link } from 'react-router'

export const UnknownRoute = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 flex items-center justify-center px-4 py-12">
      <div className="max-w-md w-full space-y-8 text-center">
        <div className="flex justify-center">
          <div className="relative">
            <div className="h-24 w-24 bg-red-100 rounded-full flex items-center justify-center">
              <AlertCircleIcon className="h-12 w-12 text-red-500" />
            </div>
            <div className="absolute -top-2 -right-2 bg-white rounded-full shadow-lg p-1">
              <div className="bg-red-500 text-white text-xs font-bold rounded-full h-6 w-6 flex items-center justify-center">
                404
              </div>
            </div>
          </div>
        </div>

        <div className="space-y-2">
          <h1 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">Page not found</h1>
          <p className="text-gray-500 text-lg">Sorry, we couldn't find the page you're looking for.</p>
        </div>

        <div className="space-y-4">
          <p className="text-sm text-gray-500">
            The page might have been moved, deleted, or perhaps you mistyped the URL.
          </p>

          <Link
            to={"/"}
            className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-gray-900 hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 transition-colors duration-200"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to homepage
          </Link>
        </div>

        <div className="pt-6 text-sm text-gray-500 border-t border-gray-200 mt-8">
          <p>If you believe this is an error, please contact support.</p>
        </div>
      </div>
    </div>
  )
}

export default UnknownRoute
