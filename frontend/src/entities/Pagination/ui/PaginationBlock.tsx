"use client";

import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationNext,
  PaginationPrevious,
} from "@/shared/ui";
import { observer } from "mobx-react-lite";
import { useParams, usePathname, useRouter } from "next/navigation";
import { FC } from "react";
import { usePagination } from "..";

interface PaginationBlockProps {
  disabledNext?: boolean;
  disabledPrev?: boolean;
}

export const PaginationBlock: FC<PaginationBlockProps> = observer(
  ({ disabledNext, disabledPrev }) => {
    const router = useRouter();
    const pathname = usePathname();
    const { page, nextPage, prevPage } = usePagination();
    const pathnameSplit = pathname.split("/").slice(1, -1);
    const nextHref = +page + 1;
    const prevHref = +page - 1;

    return (
      <div className="mb-5">
        <Pagination>
          <PaginationContent>
            <PaginationItem>
              <PaginationPrevious
                aria-disabled={disabledPrev}
                href={!disabledPrev && String(prevHref)}
                onClick={(e) => {
                  e.preventDefault();
                  if (disabledPrev) return;
                  prevPage();
                  router.push(`/${pathnameSplit.join("/")}/${prevHref}`);
                }}
              />
            </PaginationItem>
            <PaginationItem>
              <PaginationNext
                aria-disabled={disabledNext}
                href={!disabledNext && String(nextHref)}
                onClick={(e) => {
                  e.preventDefault();
                  if (disabledNext) return;
                  nextPage();
                  router.push(`/${pathnameSplit.join("/")}/${nextHref}`);
                }}
              />
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      </div>
    );
  }
);
