import React, { FC, useEffect, useState } from 'react';
import root from 'react-shadow';
import tailwind from '../../css/tailwind.css';

const Form: FC = () => {
  useEffect(() => {}, []);

  return (
    <>
      <root.div className="quote">
        <style>{tailwind}</style>
        <form className="w-full">
          <label className="mt-2 text-red-900">
            Is going:
            <input name="isGoing" type="checkbox" />
          </label>
          <br />
          <label className="mt-2 text-red-900">
            Number of guests?:
            <input name="numberOfGuests" type="number" />
          </label>
        </form>
      </root.div>
    </>
  );
};

export default Form;
