export function renderTaskTitle({title, count}) {
  const wrapper = document.createElement("section");
  wrapper.className = "w-full mt-10 mb-5 px-4";

  wrapper.innerHTML = `
            <h2
              class="lg:text-xl font-extrabold text-[#242424] dark:text-[#FFFFFF]"
            >
              ${title}
            </h2>
            <p
              class="text-xs mt-1 lg:text-sm font-normal lg:font-extrabold text-[#696969] dark:text-[#848890] farsi_digits"
            >
              ${count} تسک انجام شده
            </p>
  `;

  return wrapper;
}
