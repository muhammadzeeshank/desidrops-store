"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import {
  forwardRef,
  useEffect,
  useImperativeHandle,
  useRef,
  useState,
} from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { PhoneInput } from "./PhoneInput";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "./ui/form";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";

export type CheckoutFormRef = {
  submit: () => void;
};
import { isValidPhoneNumber } from "libphonenumber-js";

export const formSchema = z.object({
  email: z.string().email("Invalid email address"),
  country: z.string(),
  firstname: z.string().min(1, "Required"),
  lastname: z.string().min(1, "Required"),
  address: z.string().min(1, "Required"),
  city: z.string().min(1, "Required"),
  postalcode: z.string(),
  phone: z
    .string()
    .min(1, "Required")
    .refine((val) => isValidPhoneNumber(val || ""), {
      message: "Invalid phone number",
    }),
  paymentMethod: z.string(),
  billingAddress: z.string(),
});

export type CheckoutFormType = z.infer<typeof formSchema>;

type Props = {
  onSubmit: (data: CheckoutFormType) => void;
  onValidityChange?: (isValid: boolean) => void;
};

const CheckoutForm = forwardRef<CheckoutFormRef, Props>(
  ({ onSubmit, onValidityChange }, ref) => {
    const formRef = useRef<HTMLFormElement>(null);

    const form = useForm<CheckoutFormType>({
      resolver: zodResolver(formSchema),
      defaultValues: {
        email: "",
        country: "Pakistan",
        firstname: "",
        lastname: "",
        address: "",
        city: "",
        postalcode: "",
        phone: "",
        paymentMethod: "Cash on Delivery (COD)",
        billingAddress: "Same as shipping address",
      },
      mode: "onChange",
    });

    function onReset() {
      form.reset();
      form.clearErrors();
    }

    const [isValid, setIsValid] = useState(false);

    useEffect(() => {
      const subscription = form.watch(() => {
        onValidityChange?.(form.formState.isValid);
      });
      return () => subscription.unsubscribe();
    }, [form, onValidityChange]);

    // Expose submit function to parent
    useImperativeHandle(ref, () => ({
      submit: () => form.handleSubmit(onSubmit)(),
    }));
    return (
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          onReset={onReset}
          className="space-y-8 @container"
        >
          <div className="grid grid-cols-12 gap-4">
            <div className=" col-span-12 @3xl:col-span-12 col-start-auto">
              <p className="not-first:mt-6 text-xl font-medium">
                Contact Information
              </p>
            </div>

            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem className="col-span-12 @3xl:col-span-12 col-start-auto flex self-end flex-col gap-2 space-y-0 items-start">
                  <FormLabel className="flex shrink-0">Email</FormLabel>

                  <div className="w-full">
                    <FormControl>
                      <div className="relative w-full">
                        <Input
                          key="email"
                          placeholder=""
                          type="email"
                          id="email"
                          className=" "
                          {...field}
                        />
                      </div>
                    </FormControl>

                    <FormMessage />
                  </div>
                </FormItem>
              )}
            />

            <div className=" col-span-12 @3xl:col-span-12 col-start-auto">
              <p className="not-first:mt-6 text-xl font-medium">
                Shipping Information
              </p>
            </div>

            <FormField
              control={form.control}
              name="country"
              render={({ field }) => (
                <FormItem className="col-span-12 @3xl:col-span-12 col-start-auto flex self-end flex-col gap-2 space-y-0 items-start">
                  <FormLabel className="flex shrink-0">Country</FormLabel>
                  <div className="w-full">
                    <FormControl>
                      <div className="relative w-full">
                        <Input
                          key="country"
                          placeholder=""
                          type="text"
                          id="country"
                          readOnly
                          {...field}
                        />
                      </div>
                    </FormControl>
                    <div className="min-h-[20px] w-full">
                      <FormMessage />
                    </div>
                  </div>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="firstname"
              render={({ field }) => (
                <FormItem className="col-span-12 @2xl:col-span-6 col-start-auto flex self-end flex-col gap-2 space-y-0 items-start">
                  <FormLabel className="flex shrink-0">First Name</FormLabel>

                  <div className="w-full">
                    <FormControl>
                      <div className="relative w-full">
                        <Input
                          key="firstname"
                          placeholder=""
                          type="text"
                          id="firstname"
                          className=" "
                          {...field}
                        />
                      </div>
                    </FormControl>
                    <div className="min-h-[20px] w-full">
                      <FormMessage />
                    </div>
                  </div>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="lastname"
              render={({ field }) => (
                <FormItem className="col-span-12 @2xl:col-span-6 col-start-auto flex self-end flex-col gap-2 space-y-0 items-start">
                  <FormLabel className="flex shrink-0">Last Name</FormLabel>

                  <div className="w-full">
                    <FormControl>
                      <div className="relative w-full">
                        <Input
                          key="lastname"
                          placeholder=""
                          type="text"
                          id="lastname"
                          className=" "
                          {...field}
                        />
                      </div>
                    </FormControl>
                    <div className="min-h-[20px] w-full">
                      <FormMessage />
                    </div>
                  </div>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="address"
              render={({ field }) => (
                <FormItem className="col-span-12 @3xl:col-span-12 col-start-auto flex self-end flex-col gap-2 space-y-0 items-start">
                  <FormLabel className="flex shrink-0">Address</FormLabel>

                  <div className="w-full">
                    <FormControl>
                      <Textarea
                        key="address"
                        id="address"
                        placeholder=""
                        className=""
                        {...field}
                      />
                    </FormControl>

                    <FormMessage />
                  </div>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="city"
              render={({ field }) => (
                <FormItem className="col-span-12 @3xl:col-span-6 col-start-auto flex self-end flex-col gap-2 space-y-0 items-start">
                  <FormLabel className="flex shrink-0">City</FormLabel>

                  <div className="w-full">
                    <FormControl>
                      <div className="relative w-full">
                        <Input
                          key="city"
                          placeholder=""
                          type="text"
                          id="city"
                          className=" "
                          {...field}
                        />
                      </div>
                    </FormControl>
                    <div className="min-h-[20px] w-full">
                      <FormMessage />
                    </div>
                  </div>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="postalcode"
              render={({ field }) => (
                <FormItem className="col-span-12 @3xl:col-span-6 col-start-auto flex self-end flex-col gap-2 space-y-0 items-start">
                  <FormLabel className="flex shrink-0">Postal Code (Optional)</FormLabel>

                  <div className="w-full">
                    <FormControl>
                      <div className="relative w-full">
                        <Input
                          key="postalcode"
                          placeholder=""
                          type="text"
                          id="postalcode"
                          className=" "
                          {...field}
                        />
                      </div>
                    </FormControl>
                    <div className="min-h-[20px] w-full">
                      <FormMessage />
                    </div>
                  </div>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="phone"
              render={({ field }) => (
                <FormItem className="col-span-12 @3xl:col-span-12 col-start-auto flex self-end flex-col gap-2 space-y-0 items-start">
                  <FormLabel className="flex shrink-0">Phone</FormLabel>

                  <div className="w-full">
                    <FormControl>
                      <div className="relative w-full">
                        {/* <Input
                        key="phone"
                        placeholder=""
                        type="tel"
                        id="phone"
                        className=" "
                        {...field}
                      /> */}
                        <PhoneInput
                          {...field}
                          value={field.value}
                          onChange={field.onChange}
                          defaultCountry="PK"
                        />
                      </div>
                    </FormControl>

                    <FormMessage />
                  </div>
                </FormItem>
              )}
            />

            <div className=" col-span-12 @3xl:col-span-12 col-start-auto">
              <p className="not-first:mt-6 text-xl font-medium">
                Payment Method
              </p>
            </div>
            <FormField
              control={form.control}
              name="paymentMethod"
              render={({ field }) => (
                <FormItem className="col-span-12 @3xl:col-span-12 col-start-auto flex self-end flex-col gap-2 space-y-0 items-start">
                  <div className="w-full">
                    <FormControl>
                      <div className="relative w-full">
                        <Input
                          key="paymentMethod"
                          placeholder=""
                          type="text"
                          id="paymentMethod"
                          readOnly
                          className="bg-primary/10 border-ring"
                          {...field}
                        />
                      </div>
                    </FormControl>
                    <div className="min-h-[20px] w-full">
                      <FormMessage />
                    </div>
                  </div>
                </FormItem>
              )}
            />

            <div className=" col-span-12 @3xl:col-span-12 col-start-auto">
              <p className="not-first:mt-6 text-xl font-medium">
                Shipping Address
              </p>
            </div>
            <FormField
              control={form.control}
              name="billingAddress"
              render={({ field }) => (
                <FormItem className="col-span-12 @3xl:col-span-12 col-start-auto flex self-end flex-col gap-2 space-y-0 items-start">
                  <div className="w-full">
                    <FormControl>
                      <div className="relative w-full">
                        <Input
                          key="billingAddress"
                          placeholder=""
                          type="text"
                          id="billingAddress"
                          readOnly
                          className="bg-primary/10 border-ring"
                          {...field}
                        />
                      </div>
                    </FormControl>
                    <div className="min-h-[20px] w-full">
                      <FormMessage />
                    </div>
                  </div>
                </FormItem>
              )}
            />

            {/* <div className="w-full">
            <Button
              key="submit-button-0"
              className="w-full"
              type="submit"
              variant="default"
            >
              Place Order
            </Button>
          </div> */}
          </div>
        </form>
      </Form>
    );
  }
);

export default CheckoutForm;
