export function renderTaskForm({ mode = "create", task = null }) {
  const wrapper = document.createElement("div");
  wrapper.innerHTML = `
    <section id="task-form" class="w-full my-8 px-4">
        <div
        class="w-full rounded-2xl border border-neutral-200 shadow-[0px_4px_58.5px_0px_#0000000F]; bg-card-light dark:bg-background-dark dark:border-[#3D3D3D]"
        >
            <form action="#" method="get" class="">
                <div class="p-4">
                    <!-- task title -->
                    <input
                        name="task-title"
                        id="task-title-input"
                        type="text"
                        value="${task?.title ?? ""}"
                        class="w-full focus:outline-0 font-semibold placeholder:text-[#7D7D7F] text-[#323233] dark:text-white"
                        placeholder="نام تسک"
                    />
                    <!-- task title -->

                    <!-- task description -->
                    <textarea
                        name="task-desc"
                        id="task-desc-input"
                        placeholder="توضیحات"
                        class="text-sm placeholder:text-[#AFAEB2] mt-3 w-full focus:outline-0 text-[#646466] dark:text-[#83878F] resize-none scrollbar-thin scrollbar-thumb-gray-500 scrollbar-track-transparent pe-5"
                        rows="2"
                    >
                        ${task?.description ?? ""}
                    </textarea>
                    <!-- task description -->

                    <!-- task tags button -->
                    <button
                        id="tags-btn"
                        class="py-1 px-2 border-neutral-200 dark:border-[#3D3D3D] text-[#AFAEB2] font-semibold text-xs flex items-center justify-center gap-1 border rounded-sm cursor-pointer"
                        type="button"
                    >
                        <svg
                            width="16"
                            height="16"
                            viewBox="0 0 16 16"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                            class="mb-0.5"
                        >
                            <path
                                d="M2.81407 2.06665H10.4407C10.8941 2.06665 11.4607 2.37998 11.7007 2.76665L14.4874 7.21998C14.7541 7.65332 14.7274 8.33332 14.4208 8.73998L10.9674 13.34C10.7208 13.6667 10.1874 13.9333 9.78075 13.9333H2.81407C1.6474 13.9333 0.940768 12.6533 1.5541 11.66L3.40074 8.70665C3.64741 8.31332 3.64741 7.67332 3.40074 7.27998L1.5541 4.32665C0.940768 3.34665 1.65407 2.06665 2.81407 2.06665Z"
                                stroke="#AFAEB2"
                                stroke-miterlimit="10"
                                stroke-linecap="round"
                                stroke-linejoin="round"
                            />
                        </svg>
                        تگ ها
                    </button>
                    <!-- task tags button -->

                    <!-- task selected tag -->
                    <span
                        class="badge badge-danger flex justify-center items-center gap-1 text-sm! font-semibold! mt-2 w-fit"
                    >
                        <svg
                            width="16"
                            height="16"
                            viewBox="0 0 16 16"
                            fill="none"
                            class="stroke-[#1A1A1A] dark:stroke-white cursor-pointer"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <path
                                d="M4 4L8 8M8 8L12 12M8 8L12 4M8 8L4 12"
                                stroke-linecap="round"
                                stroke-linejoin="round"
                            />
                        </svg>
                        بالا
                    </span>
                    <!-- task selected tag -->

                    <!-- task tags -->
                    <div
                        class="border dark:border-[#3D3D3D] border-neutral-200 py-2.5 rounded-lg flex items-center justify-around divide-x divide-neutral-200 dark:divide-[#3D3D3D] shadow-[0px_12px_24px_-6px_#1414190F] w-50 my-5 bg-card-light dark:bg-[#0B192D]"
                    >
                        <div class="w-full px-3">
                            <button
                                type="button"
                                id="low-tag"
                                class="badge badge-success w-full cursor-pointer"
                            >
                                پایین
                            </button>
                        </div>
                        <div class="w-full px-3">
                            <button
                                type="button"
                                id="normal-tag"
                                class="badge badge-warning w-full cursor-pointer"
                            >
                                متوسط
                            </button>
                        </div>
                        <div class="w-full px-3">
                            <button
                                type="button"
                                id="high-tag"
                                class="badge badge-danger w-full cursor-pointer"
                            >
                                بالا
                            </button>
                        </div>
                    </div>
                    <!-- task tags -->
                </div>
                <!-- task footer -->
                <div
                    class="border-t border-neutral-200 dark:border-[#3D3D3D] flex items-stretch justify-end gap-1 p-4"
                >
                    <button
                        type="button"
                        class="bg-neutral-200 dark:bg-[#0C1B31] p-1.5 rounded-md cursor-pointer"
                    >
                        <svg
                        width="22"
                        height="22"
                        viewBox="0 0 22 22"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                        >
                        <path
                            d="M5.5 5.5L11 11M11 11L16.5 16.5M11 11L16.5 5.5M11 11L5.5 16.5"
                            stroke="#9E9E9E"
                            stroke-width="1.5"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            />
                        </svg>
                    </button>
                    <button
                        type="submit"
                        class="py-2.5 px-4 bg-primary-light dark:bg-primary-dark text-white rounded-md font-semibold text-xs cursor-pointer"
                    >
                        ${mode === "edit" ? "ویرایش تسک" : "اضافه کردن تسک"}
                    </button>
                </div>
                <!-- task footer -->
            </form>
        </div>
    </section>
  `;
  return wrapper.firstElementChild;
}
