import React from 'react'

const about = () => {
  return (
    // A section for displaying information about a person.
    <section className="text-gray-600 body-font">
  <div className="container px-5 py-24 mx-auto flex flex-col" bis_skin_checked="1">
    <div className="lg:w-4/6 mx-auto" bis_skin_checked="1">
      <div className="rounded-lg h-64 overflow-hidden" bis_skin_checked="1">
        <img alt="content" className="object-cover object-center h-full w-full" src="https://images.pexels.com/photos/5338279/pexels-photo-5338279.jpeg?auto=compress&cs=tinysrgb&w=800"/>
      </div>
      <div className="flex flex-col sm:flex-row mt-10" bis_skin_checked="1">
        <div className="sm:w-1/3 text-center sm:pr-8 sm:py-8" bis_skin_checked="1">
          <div className="w-20 h-20 rounded-full inline-flex items-center justify-center bg-gray-200 text-gray-400" bis_skin_checked="1">
          </div>
          <div className="flex flex-col items-center text-center justify-center" bis_skin_checked="1">
            <h2 className="font-medium title-font mt-4 text-gray-900 text-lg">Phoebe Caulfield</h2>
            <div className="w-12 h-1 bg-indigo-500 rounded mt-2 mb-4" bis_skin_checked="1"></div>
            <p className="text-base">Raclette knausgaard hella meggs normcore williamsburg enamel pin sartorial venmo tbh hot chicken gentrify portland.</p>
          </div>
        </div>
        <div className="sm:w-2/3 sm:pl-8 sm:py-8 sm:border-l border-gray-200 sm:border-t-0 border-t mt-4 pt-4 sm:mt-0 text-center sm:text-left" bis_skin_checked="1">
          <p className="leading-relaxed text-lg mb-4">Short brief about my self.</p>
          <a className="text-indigo-500 inline-flex items-center">Learn More
          </a>
        </div>
      </div>
    </div>
  </div>
</section>
  )
}

export default about